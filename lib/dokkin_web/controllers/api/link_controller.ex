defmodule DokkinWeb.API.LinkController do
  use DokkinWeb, :controller

  alias Dokkin.API.LinkService

  def show(conn, %{"id" => id}) do
    render conn, "show.json", %{link: LinkService.get(id)}
  end

  def index(conn, _) do
    render conn, "index.json", %{links: LinkService.get_available()}
  end
end
