defmodule DokkinWeb.PageController do
  use DokkinWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
