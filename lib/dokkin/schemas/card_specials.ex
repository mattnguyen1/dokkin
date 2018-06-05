defmodule Dokkin.CardSpecials do
  use Ecto.Schema
  import Ecto.Changeset


  schema "card_specials" do
    field :card_id, :integer
    field :special_id, :integer
    field :eball_num_start, :integer
  end

  @doc false
  def changeset(card_specials, attrs) do
    card_specials
    |> cast(attrs, [:card_id, :special_id, :eball_num_start])
    |> validate_required([:card_id, :special_id, :eball_num_start])
  end
end
