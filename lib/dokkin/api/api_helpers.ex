defmodule Dokkin.APIHelpers do
  @moduledoc """
  Helpers for interacting with the API
  """
  use Dokkin.Constants

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

  @spec get_base_element(integer) :: String.t
  def get_base_element(element) do
    IO.inspect(element)
    IO.inspect(rem(2, 10))
    Atom.to_string(@element[rem(element, 10)])
  end

  @spec get_base_name(String.t) :: String.t
  def get_base_name(name) do
    regex_matches = Enum.join(@name_extras, "|")

    name
    |> String.downcase()
    |> String.replace(~r/#{regex_matches}/, "")
    |> String.trim()
  end

  @spec get_unix_time(NaiveDateTime.t) :: integer
  def get_unix_time(naive_dt) do
    naive_dt
    |> IO.inspect()
    |> DateTime.from_naive!("Etc/UTC")
    |> DateTime.to_unix()
  end
end
