from models import UserModel

class UserService:
    def __init__(self):
        self.model = UserModel()

    def create(self, params):
        return self.model.create(params)

    def get_user(self, email):
        return self.model.get_user(email)

    def update_user(self, params):
        return self.model.update_user(params)

    def verify_user(self, email, password):
        return self.model.verify_user(email, password)
