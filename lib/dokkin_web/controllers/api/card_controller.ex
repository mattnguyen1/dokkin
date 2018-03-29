defmodule DokkinWeb.API.CardController do
  use DokkinWeb, :controller

  alias Dokkin.API.SearchService

  def index(conn, params) do
    render conn, "index.json", %{cards: SearchService.search(params["name"])}
  end
end
