# app/controllers/registrations_controller.rb

class RegistrationsController < Devise::RegistrationsController

  def delete_an_image
    @image = ActiveStorage::Attachment.find_by_id(params.require(:user).permit(:attachment_id))
    @image.purge
    redirect_to posts_path
  end

  private

  def sign_up_params
      params.require(:user).permit(:image, :name, :username, :email, :password, :password_confirmation)
  end

  def acount_update_params
    @user = User.current_user
    params.require(:user).permit(:image, :name, :username, :email, :password, :password_confirmation, :current_password)
    @user.image.attach(params[:image])
  end

  end
