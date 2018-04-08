defmodule Dokkin.API.SearchService do
  @moduledoc """
  Service for searching cards
  """

  use GenServer
  use Dokkin.Constants
  alias Dokkin.API.CardService
  alias Dokkin.Repo

  @search_timeout 5000
  @aliases %{
    "ssj" => "super saiyan",
    "ss2" => "super saiyan 2",
    "ssj2" => "super saiyan 2",
    "ss3" => "super saiyan 3",
    "ssj3" => "super saiyan 3",
    "ss4" => "super saiyan 4",
    "ssj4" => "super saiyan 4",
    "ssb" => "super saiyan god ss",
    "vb" => "super saiyan god ss vegito",
    "buuhan" => "majin buu (ultimate gohan)",
    "agf" => "angel golden frieza",
    "blue" => "super saiyan god ss",
    "sv" => "super vegito",
    "bojack" => "boujack",
  }
  @token_blacklist ["ss", "agl", "str", "teq", "int", "phy", "r", "n", "1", "2", "3", "4"]
  @split_regex ~r/[ ]+(?=([^"]*"[^"]*")*[^"]*$)/
  @default_limit 100
  @default_offset 0

  ##############
  ### Client ###
  ##############

  def start_link(args \\ nil) do
    GenServer.start_link(__MODULE__, args)
  end

  @doc """
  Searches the set of all cards based on the query.
  """
  @spec search(pid, String.t) :: list
  def search(pid, query) do
    GenServer.call(pid, {:search, query})
  end

  @doc """
  Searches the set of all cards based on the query from the SearchService genserver process
  """
  @spec search(map) :: list
  def search(%{"search_q" => search_q} = params) do
    Benchmark.measure("Dokkin.API.SearchService.search()", fn ->
      limit = if Map.has_key?(params, "limit") do String.to_integer(params["limit"]) else @default_limit end
      offset = if Map.has_key?(params, "offset") do String.to_integer(params["offset"]) else @default_offset end
      Repo.fetch_search(search_q, limit, offset, &do_search/3)
    end)
  end

  @spec do_search(String.t, integer, integer) :: list
  defp do_search(query, limit, offset) do
    :poolboy.transaction(
      :search_pool,
      fn(pid) -> GenServer.call(pid, {:search, query, limit, offset}) end,
      @search_timeout
    )
  end

  ##############
  ### Server ###
  ##############

  def init(_) do
    {:ok, create_index()}
  end

  def handle_call({:search, query, limit, offset}, _from, state) do
    query = normalize(query)
    results = Benchmark.measure("Dokkin.API.SearchService.handle_call(:search)::filter", fn -> 
      Enum.filter(state, fn(card) -> contains_all?(query, card.name) end)
    end)
    total = length(results)
    marker = if total - offset - limit > 0 do offset + limit else -1 end

    # Return paginated results
    results
    |> Enum.sort_by(&(&1.atk_max), &>=/2)
    |> Enum.drop(offset)
    |> Enum.take(limit)
    |> Enum.reduce([], fn(card, acc) -> [card.id | acc] end)
    |> CardService.get()
    |> (&({:reply, {&1, total, marker}, state})).()
  end

  def handle_call(request, from, state) do
    super(request, from, state)
  end

  def handle_cast(request, state) do
    super(request, state)
  end

  @spec create_index() :: list
  defp create_index() do
    CardService.get_all()
    |> Enum.map(&card_to_index/1)
  end

  @spec card_to_index(map) :: map
  defp card_to_index(%{
    card: card,
    leader_skill: leader_skill,
    link1: link1,
    link2: link2,
    link3: link3,
    link4: link4,
    link5: link5,
    link6: link6,
    link7: link7,
    cat1: cat1,
    cat2: cat2,
    cat3: cat3,
    cat4: cat4,
    cat5: cat5,
    cat6: cat6
  }) do
    rarity = Atom.to_string(@rarity[card.rarity])
    alliance = Atom.to_string(@alliance_types[card.awakening_element_type])
    type = Atom.to_string(@element[rem(card.element,10)])
    links = Enum.reject([link1, link2, link3, link4, link5, link6, link7], &is_nil/1)
    categories = Enum.reject([cat1, cat2, cat3, cat4, cat5, cat6], &is_nil/1)
    %{
      id: card.id,
      name: Enum.join(
        [alliance, type, rarity, normalize(leader_skill), normalize(card.name),
         normalize(Enum.join(links, " ")), normalize(Enum.join(categories, " "))], " "),
      links: links,
      categories: categories,
      alliance: alliance,
      type: type,
      atk_max: card.atk_max
    }
  end

  @spec normalize(String.t) :: String.t
  defp normalize(text) do
    text
    |> WordSmith.remove_accents
    |> String.downcase
    |> String.split(" ")
    |> Enum.map_join(" ", fn(token) -> 
      token_alias = @aliases[token]
      if (token_alias) do
        token_alias
      else
        token
      end
    end)
  end

  @spec contains_all?(String.t, String.t) :: boolean
  defp contains_all?(query, text) do
    query
    |> String.split(@split_regex)
    |> Enum.map(&remove_quotes/1)
    |> Enum.all?(fn(token) -> 
      String.contains?(text, normalize_contains_all_token(token))
    end)
  end

  @spec normalize_contains_all_token(String.t) :: String.t
  defp normalize_contains_all_token(token) do
    if Enum.member?(@token_blacklist,token) do
      " " <> token <> " "
    else
      token
    end
  end

  @spec remove_quotes(String.t) :: String.t
  defp remove_quotes(text) do
    String.replace(text, "\"", "")
  end
end
