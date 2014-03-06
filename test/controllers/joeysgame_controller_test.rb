require 'test_helper'

class JoeysgameControllerTest < ActionController::TestCase
  test "should get floor2page" do
    get :floor2page
    assert_response :success
  end

end
