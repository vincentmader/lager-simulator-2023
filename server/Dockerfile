FROM python:3.8

WORKDIR /var/www/lager-simulator

COPY . .

RUN pip install -r requirements.txt

EXPOSE 5011

ENTRYPOINT ./entrypoint.sh
