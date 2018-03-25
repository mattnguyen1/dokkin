defmodule DokkinWeb.LayoutView do
  use DokkinWeb, :view

  def css_link_tag do
   if Mix.env == :prod do
     "<link rel=\"stylesheet\" type=\"text/css\" href=\"/src/css/app.css\" />"
   else
     ""
   end
  end

  def js_script_tag do
   if Mix.env == :prod do
     # In production we'll just reference the file
     "<script src=\"/src/js/index.js\"></script>"
   else
     # In development mode we'll load it from our webpack dev server
     "<script src=\"http://localhost:8080/main.js\"></script>"
   end
 end
end
