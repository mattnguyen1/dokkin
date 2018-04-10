defmodule Dokkin.Card do
  use Ecto.Schema
  use Dokkin.Constants
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
    field :resource_id, :integer
    field :atk_max, :integer
    field :passive_skill_set_id, :integer
  end

  def alliance(card) do
    @alliance_types[card.awakening_element_type]    
  end

  def rarity(card) do
    Atom.to_string(@element[card.rarity]) |> String.upcase()
  end

  def element(card) do
    Atom.to_string(@element[rem(card.element, 10) * 10]) |> String.upcase()
  end

  @doc false
  def changeset(card, attrs) do
    card
    |> cast(attrs, [:name, :character_id, :cost, :rarity, :element, :leader_skill_id, :awakening_element_type, :card_unique_info_id, :resource_id, :atk_max, :passive_skill_set_id])
    |> validate_required([:name, :character_id, :cost, :rarity, :element, :leader_skill_id, :awakening_element_type, :card_unique_infos, :resource_id, :atk_max, :passive_skill_set_id])
  end
end
