from models import ProductModel

class ProductsService:
    def __init__(self):
        self.model = ProductModel()

    def create(self, params):
        return self.model.create(params)

    def get_product(self, product_id):
        return self.model.get_product(product_id)

    def update_product(self, params):
        return self.model.update_product(params)

    def get_all_products(self):
        return self.model.get_all_products()