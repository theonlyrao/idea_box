require 'rails_helper'

RSpec.describe "IdeasController", type: :request do
  before(:each) do
    @swill = create(:idea)
    @plausible = create(:idea, quality: "plausible")
    @genius = create(:idea, quality: "genius")
  end
  
  describe "GET /api/v1/ideas" do
    it "returns all ideas" do
      get "/api/v1/ideas"
      expect(response).to have_http_status(200)
      parsed_response = JSON.parse(response.body)
      expect(response.content_type).to eq("application/json")
      expect(parsed_response.count).to eq(3)
    end
  end

  describe "POST /api/v1/ideas" do
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

  describe "DELETE /api/v1/ideas/:id" do
    it "deletes the idea" do
      target = Idea.last
      expect { delete "/api/v1/ideas/#{target.id}" }.to change(Idea, :count).by(-1)
    end
  end

  describe "PUT /api/v1/ideas/:id" do
    it "updates the idea" do
      target = Idea.find_by(quality: "genius")
      new_title = "updated title"
      new_body = "updated body"
      new_quality = "swill"
      patch "/api/v1/ideas/#{target.id}", idea: { title: new_title, body: new_body, quality: new_quality }
      updated = JSON.parse(response.body)

      expect(Idea.find(target.id).title).to eq(updated["title"])
      expect(Idea.find(target.id).body).to eq(updated["body"])
      expect(Idea.find(target.id).quality).to eq(updated["quality"])                    
    end
  end
end
