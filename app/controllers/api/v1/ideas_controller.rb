class Api::V1::IdeasController < ApiController

  def index
    respond_with Idea.all
  end

  def create
    respond_with Idea.create!(idea_params)
  end

  def destroy
    Idea.destroy(params[:id])
    render json: {}, status: :no_content
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end
end
