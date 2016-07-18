class Api::V1::IdeasController < ApiController

  def index
    respond_with Idea.all
  end

  def create
    new_title = ActiveRecord::Base::sanitize(idea_params["title"]).delete("'")
    new_quality = ActiveRecord::Base::sanitize(idea_params["quality"]).delete("'")
    new_body = ActiveRecord::Base::sanitize(idea_params["body"]).delete("'")
    respond_with Idea.create!(title: new_title, quality: new_quality, body: new_body)
  end

  def destroy
    Idea.destroy(params[:id])
    render json: {}, status: :no_content
  end

  def update
    @updated_idea = Idea.update(params[:id], idea_params)
    if @updated_idea
      respond_with @updated_idea do |format|
        format.json { render json: @updated_idea.to_json, status: :ok }
      end
    else
      respond with error_hash do |format|
        format.json { render json: error_hash.to_json(root: :error), status: :not_found }
      end
    end
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end
end
