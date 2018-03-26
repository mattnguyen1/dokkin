defmodule DokkinWeb.API.CardController do
  use DokkinWeb, :controller

  alias Dokkin.API.CardService

  def index(conn, params) do
    render conn, "index.json", %{cards: CardService.list_cards(params["name"])}
  end
end
