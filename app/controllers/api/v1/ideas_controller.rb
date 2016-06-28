class Api::V1::IdeasController < ApiController

  def index
    respond_with Idea.all
  end
  
end
