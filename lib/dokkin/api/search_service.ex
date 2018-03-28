defmodule Dokkin.API.SearchService do
  @moduledoc """
  The Search Service context.
  """

  use Dokkin.Constants
  use GenServer
  alias Dokkin.API.CardService

  # Client

  def start_link do
    GenServer.start_link(__MODULE__, [])
  end

  def search(pid, query) do
    GenServer.call(pid, {:search, query})
  end

  def get(pid) do
    GenServer.call(pid, :get)
  end

  # Server

  def init(args) do
    {:ok, create_index()}
  end

  def handle_call({:search, query}, _from, state) do
    results = Enum.filter(state, fn(card) -> Regex.match?(~r/#{query}/i, card.name) end)
    {:reply, results, state}
  end

  def handle_call(:get, _from, state) do
    {:reply, state, state}
  end

  def handle_call(request, from, state) do
    super(request, from, state)
  end

  def handle_cast(request, state) do
    super(request, state)
  end

  defp create_index() do
    CardService.get_cards()
    |> Enum.map(&card_to_index/1)
  end

  defp card_to_index({card, leader_skill}) do
    %{
      id: card.id,
      name: Enum.join([
        Atom.to_string(@alliance_types[card.awakening_element_type]),
        Atom.to_string(@element[rem(card.element,10)]),
        leader_skill,
        card.name], " ")
    }
  end
end
