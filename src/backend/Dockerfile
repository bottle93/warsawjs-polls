FROM python:3.6

WORKDIR /srv

COPY requirements.txt .
RUN pip install -r requirements.txt

ADD https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh /usr/bin/
RUN chmod +x /usr/bin/wait-for-it.sh

COPY . .

CMD ["python", "manage.py", "runserver"]