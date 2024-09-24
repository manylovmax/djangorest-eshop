# pull official base image
FROM python:3.12.6-alpine3.20
# Prevents Python from writing pyc files to disc (equivalent to python -B option)
ENV PYTHONDONTWRITEBYTECODE 1
# Prevents Python from buffering stdout and stderr (equivalent to python -u option)
ENV PYTHONUNBUFFERED 1
# install psycopg2 dependencies
RUN apk update && apk add gcc python3-dev musl-dev
# set work directory
WORKDIR /usr/src/app
# install dependencies
COPY ./requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
# copy project
COPY . .
CMD python manage.py migrate && python manage.py runserver 0.0.0.0:8000