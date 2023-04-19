up:
	docker-compose up -d --build
down:
	docker-compose stop
logs:
	docker-compose logs -f -t
browser:
	open http://lager-simulator-2023.lo
