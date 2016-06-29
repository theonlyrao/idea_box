class Idea < ActiveRecord::Base
  default_scope { order('created_at ASC') }

  validates_inclusion_of :quality, in: %w(genius plausible swill)
  validates_presence_of :title, :body
  
end
