class Idea < ActiveRecord::Base

  validates_inclusion_of :quality, in: %w(genius plausible swill)
  validates_presence_of :title, :body
  
end
