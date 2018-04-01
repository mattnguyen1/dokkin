defmodule DokkinWeb.API.CardController do
  use DokkinWeb, :controller

  alias Dokkin.API.SearchService
  alias Dokkin.API.CardService

  def index(conn, params) do
    render conn, "index.json", %{cards: SearchService.search(params["search_q"])}
  end

  def show(conn, %{"id" => id}) do
    render conn, "show.json", %{card: CardService.get(%{id: id})}
  end
end
