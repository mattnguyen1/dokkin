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

  scope "/", DokkinWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api", DokkinWeb.API do
    pipe_through :api

    resources "/cards", CardController
  end

  # Other scopes may use custom stacks.
  # scope "/api", DokkinWeb do
  #   pipe_through :api
  # end
end
