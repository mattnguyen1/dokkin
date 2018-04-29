defmodule DokkinWeb.API.CardController do
  use DokkinWeb, :controller

  alias Dokkin.API.SearchService
  alias Dokkin.API.CardService

  def index(conn, params) do
    {cards, total_results, marker} = SearchService.search(params)
    render conn, "index.json", %{cards: cards, total_results: total_results, marker: marker}
  end

  def show(conn, %{"id" => id}) do
    IO.inspect(id, label: "potato")
    render conn, "show.json", %{
      card: CardService.get(%{id: id}),
      next_dokkan: CardService.get_next_dokkan(id),
      prev_dokkan: CardService.get_prev_dokkan(id)
    }
  end
end
