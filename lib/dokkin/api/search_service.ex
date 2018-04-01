defmodule Dokkin.API.SearchService do
  @moduledoc """
  Service for searching cards
  """

  use GenServer
  use Dokkin.Constants
  alias Dokkin.API.CardService
  alias Dokkin.Repo

  @search_timeout 5000

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
  @spec search(String.t) :: list
  def search(query) do
    Benchmark.measure("Dokkin.API.SearchService.search()", fn ->
      Repo.fetch_search(query, &do_search/1, 1)
    end)
  end

  @spec do_search(String.t) :: list
  defp do_search(query) do
    :poolboy.transaction(
      :search_pool,
      fn(pid) -> GenServer.call(pid, {:search, query}) end,
      @search_timeout
    )
  end

  ##############
  ### Server ###
  ##############

  def init(_) do
    {:ok, create_index()}
  end

  def handle_call({:search, query}, _from, state) do
    query = query |> WordSmith.remove_accents()
    results = Benchmark.measure("Dokkin.API.SearchService.handle_call(:search)::filter", fn -> 
      Enum.filter(state, fn(card) -> Regex.match?(regex_search(query), card.name) end)
    end)
    |> Enum.reduce([], fn(card, acc) -> [card.id | acc] end)
    |> CardService.get()
    {:reply, results, state}
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
    alliance = Atom.to_string(@alliance_types[card.awakening_element_type])
    type = Atom.to_string(@element[rem(card.element,10)])
    %{
      id: card.id,
      name: Enum.join([
        alliance, type,
        WordSmith.remove_accents(leader_skill),
        WordSmith.remove_accents(card.name)], " "),
      links: Enum.reject([link1, link2, link3, link4, link5, link6, link7], &is_nil/1),
      categories: Enum.reject([cat1, cat2, cat3, cat4, cat5, cat6], &is_nil/1),
      alliance: alliance,
      type: type
    }
  end

  @spec regex_search(String.t) :: Regex.t
  defp regex_search(query) do
    query
    |> String.split(" ")
    |> Enum.reduce("", fn(token, acc) -> acc <> regex_single_search_token(token) end)
    |> Regex.compile("i")
    |> case do
        {:ok, regex} -> regex
        _ -> nil
      end
  end

  @spec regex_single_search_token(String.t) :: String.t
  defp regex_single_search_token(query_token) do
    "(?=.*#{query_token})"
  end
end
