defmodule DokkinWeb.API.LinkController do
  use DokkinWeb, :controller

  alias Dokkin.API.LinkService

  def show(conn, %{"id" => id}) do
    render conn, "show.json", %{link: LinkService.get(id)}
  end
end
