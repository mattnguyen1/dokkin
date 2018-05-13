defmodule SQLiteDateTime do
  @behaviour Ecto.Type

  def type, do: Ecto.Date

  def cast(string) when is_binary(string) do
    NaiveDateTime.from_iso8601!(string)
  end
  def cast(date), do: date

  def load(value) do
    {:ok, cast(value)}
  end

  defdelegate dump(x), to: NaiveDateTime
end