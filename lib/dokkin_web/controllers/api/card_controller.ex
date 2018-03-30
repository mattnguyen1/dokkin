defmodule DokkinWeb.API.CardController do
  use DokkinWeb, :controller

  alias Dokkin.API.SearchService
  alias Dokkin.API.CardService

  def index(conn, params) do
    render conn, "index.json", %{cards: SearchService.search(params["name"])}
  end

  def show(conn, %{"id" => id}) do
    render conn, "show.json", %{card: CardService.get_card_by_id(id)}
  end
end
