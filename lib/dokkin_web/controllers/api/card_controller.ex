defmodule DokkinWeb.API.CardController do
  use DokkinWeb, :controller

  alias Dokkin.API.SearchService
  alias Dokkin.API.CardService

  def index(conn, params) do
    {cards, total_results, marker} = SearchService.search(params)
    render conn, "index.json", %{cards: cards, total_results: total_results, marker: marker}
  end

  def show(conn, %{"id" => id}) do
    render conn, "show.json", %{card: CardService.get(%{id: id})}
  end
end
