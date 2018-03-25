defmodule Dokkin.Card do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Poison.Encoder, except: [:__meta__]}
  schema "cards" do
    field :character_id, :integer
    field :cost, :integer
    field :element, :integer
    field :leader_skill_id, :integer
    field :name, :string
    field :rarity, :integer
    field :awakening_element_type, :integer
    field :card_unique_info_id, :integer
  end

  @doc false
  def changeset(card, attrs) do
    card
    |> cast(attrs, [:name, :character_id, :cost, :rarity, :element, :leader_skill_id, :awakening_element_type, :card_unique_info_id])
    |> validate_required([:name, :character_id, :cost, :rarity, :element, :leader_skill_id, :awakening_element_type, :card_unique_infos])
  end
end
