class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # Leaking RecordNotFound so we don't have to translate error to 404 when testing

	rescue_from ActiveRecord::RecordNotFound do
		respond_to do |type|
			type.all { render :nothing => true, :status => 404 }
		end
	end
end
