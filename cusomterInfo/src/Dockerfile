# Use an official Python runtime as an image
FROM python:3.9
# EXPOSE instruction indicates the ports on which a container
# will listen for connections
# Flask apps listen to port 5000 by default, so we expose it
EXPOSE 5001
# WORKDIR sets the working directory for following COPY and CMD
# instructions
# Notice we haven’t created a directory by this name - this
# instruction creates a directory with this name if it doesn’t exist
WORKDIR /src
# Install any needed packages specified in requirements.txt
COPY requirements.txt /src
RUN pip install -r requirements.txt
# Run app.py when the container launches
COPY app.py service.py models.py /src
CMD python app.py
