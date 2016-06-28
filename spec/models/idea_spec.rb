require 'rails_helper'

RSpec.describe Idea, type: :model do
  it "validates properly" do
    should validate_inclusion_of(:quality).in_array(%w(genius plausible swill))
    should validate_presence_of(:title)
    should validate_presence_of(:body)
  end

  it "knows when idea was created" do
    idea = create(:idea)
    expect(idea).to have_attributes(created_at: (a_value > 1.day.ago))
  end

  it "sets default quality to swill" do
    idea = Idea.create(title: "Idea", body: "This is the body")
    expect(idea.quality).to eq("swill")
  end
  
end
