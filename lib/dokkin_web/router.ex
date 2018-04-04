defmodule DokkinWeb.Router do
  use DokkinWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", DokkinWeb.API do
    pipe_through :api

    resources "/cards", CardController
  end

  scope "/", DokkinWeb do
    pipe_through :browser # Use the default browser stack

    # React does all the routing outside of the API
    get "/*path", PageController, :index
  end
end
