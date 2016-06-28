require 'rails_helper'

RSpec.describe "IdeasController", type: :request do
  before(:each) do
    @swill = create(:idea)
    @plausible = create(:idea, quality: "plausible")
    @genius = create(:idea, quality: "genius")
  end
  
  describe "GET /ideas" do
    it "returns all ideas" do
      get "/api/v1/ideas"
      expect(response).to have_http_status(200)
      parsed_response = JSON.parse(response.body)
      expect(response.content_type).to eq("application/json")
      expect(parsed_response.count).to eq(3)
    end
  end

  describe "POST /ideas" do
    it "creates a new idea" do
      post "/api/v1/ideas", idea: { title: "new idea title", body: "new idea body" }
      idea = JSON.parse(response.body)

      expect(Idea.last.title).to eq(idea["title"])
      expect(Idea.last.created_at).to be > Date.today
      expect(idea["title"]).to eq("new idea title")
      expect(idea["body"]).to eq("new idea body")
      expect(idea["quality"]).to eq("swill")
    end
  end
end
