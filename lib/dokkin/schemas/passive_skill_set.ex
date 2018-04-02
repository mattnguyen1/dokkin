defmodule Dokkin.PassiveSkillSet do
  use Ecto.Schema
  import Ecto.Changeset


  schema "passive_skill_sets" do
    field :description, :string
    field :name, :string
  end

  @doc false
  def changeset(passive_skill_set, attrs) do
    passive_skill_set
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
