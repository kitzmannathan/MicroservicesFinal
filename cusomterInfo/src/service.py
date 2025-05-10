from models import UserModel

class UserService:
    def __init__(self):
        self.model = UserModel()

    def create(self, params):
        return self.model.create(params)

    def get_user(self, user_id):
        return self.model.get_user(user_id)

    def update_user(self, params):
        return self.model.update_user(params)