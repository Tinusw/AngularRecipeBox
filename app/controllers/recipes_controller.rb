class RecipesController < ApplicationController
  def index
  	@recipes = if params[:keywords]
  		           Recipe.where('name ilike ?', "%#{params[:keywords]}%")
  		         else
  		         	[]
  		         end
  end

  def show
  	@recipe = Recipe.find(params[:id])
  end

  private
  def recipe_params
  	params.require(:recipe).permit(:name, :instructions)
  end
end
