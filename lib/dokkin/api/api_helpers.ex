defmodule Dokkin.APIHelpers do
  @moduledoc """
  Helpers for interacting with the API
  """

  @spec card_url(map) :: String.t
  def card_url(card_response) do
    "/card/" <> card_slug(card_response)
  end

  @spec card_slug(map) :: String.t
  def card_slug(card_response) do
    full_name = card_response.leader_skill <> " " <> card_response.card.name
    correct_slug = normalize_slug(Integer.to_string(card_response.card.id) <> "-" <> full_name)
  end

  @spec normalize_slug(String.t) :: String.t
  def normalize_slug(text) do
    text
    |> WordSmith.remove_accents()
    |> String.downcase()
    |> String.replace(~r/[#&\[\]]/, "")
    |> String.replace(~r/ +/, "-")
  end
end
