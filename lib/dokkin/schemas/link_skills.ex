defmodule Dokkin.LinkSkills do
  use Ecto.Schema
  import Ecto.Changeset


  schema "link_skills" do
    field :description, :string
    field :name, :string
  end

  @doc false
  def changeset(link_skills, attrs) do
    link_skills
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
