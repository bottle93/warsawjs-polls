FROM python:3.6

WORKDIR /srv

COPY requirements.txt .
RUN pip install -r requirements.txt

ADD https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh /bin/wait-for-it
RUN chmod +x /bin/wait-for-it

COPY . .

CMD ["python", "manage.py", "runserver"]