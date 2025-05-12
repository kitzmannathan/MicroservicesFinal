from models import OrderModel

class OrderService:
    def __init__(self):
        self.model = OrderModel()

    def create(self, params):
        return self.model.create(params)

    def get_order(self, order_id):
        return self.model.get_order(order_id)

    def get_order_items(self, order_id):
        return self.model.get_order_items(order_id)

    def update_ship_date(self, params):
        return self.model.update_ship_date(params)

    def add_items_to_order(self, params):
        return self.model.add_items_to_order(params)

    def get_user_orders(self, user_id):
        return self.model.get_user_orders(user_id)