defmodule Dokkin.API.SearchService do
  @moduledoc """
  Service for searching cards
  """

  use Dokkin.Constants
  use GenServer
  alias Dokkin.API.CardService
  alias Dokkin.Repo

  @search_timeout 5000

  # Client

  def start_link(name \\ nil) do
    GenServer.start_link(__MODULE__, nil, [name: name])
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
    Repo.fetch_search(query, &do_search/1, 1)
  end

  @spec do_search(String.t) :: list
  defp do_search(query) do
    GenServer.call(Dokkin.API.SearchService, {:search, query})
  end

  # @doc """
  # Searches the set of all cards based on the query.
  # """  
  # @spec search(String.t) :: list
  # def search(query) do
  #   :poolboy.transaction(
  #     :search_worker,
  #     fn(pid) -> GenServer.call(pid, {:search, query}) end,
  #     @search_timeout
  #   )
  # end

  # Server

  def init(args) do
    {:ok, create_index()}
  end

  def handle_call({:search, query}, _from, state) do
    query = query |> WordSmith.remove_accents()
    results = Enum.filter(state, fn(card) -> Regex.match?(search_regex(query), card.name) end)
    |> Enum.reduce([], fn(card, acc) -> [card.id | acc] end)
    |> CardService.get_cards_by_id()
    {:reply, results, state}
  end

  def handle_call(request, from, state) do
    super(request, from, state)
  end

  def handle_cast(request, state) do
    super(request, state)
  end

  defp create_index() do
    CardService.get_all_cards()
    |> Enum.map(&card_to_index/1)
  end

  defp card_to_index({card, leader_skill}) do
    %{
      id: card.id,
      name: Enum.join([
        Atom.to_string(@alliance_types[card.awakening_element_type]),
        Atom.to_string(@element[rem(card.element,10)]),
        WordSmith.remove_accents(leader_skill),
        WordSmith.remove_accents(card.name)], " ")
    }
  end

  defp search_regex(query) do
    query
    |> String.split(" ")
    |> Enum.reduce("", fn(token, acc) -> acc <> search_lookahead_regex(token) end)
    |> Regex.compile("i")
    |> case do
        {:ok, regex} -> regex
        _ -> nil
      end
  end

  defp search_lookahead_regex(query_token) do
    "(?=.*#{query_token})"
  end
end
