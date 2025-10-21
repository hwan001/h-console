.PHONY: deploy build clean

deploy:
	@if [ -z "$(filter-out $@,$(MAKECMDGOALS))" ]; then \
		echo "서비스 이름을 입력하세요. 예: make deploy fe [be|agent]"; \
		exit 1; \
	fi; \
	for svc in $(filter-out $@,$(MAKECMDGOALS)); do \
		echo "Deploying $$svc..."; \
		./scripts/tag-release.sh $$svc; \
	done

# be만 context를 루트로 설정 (protos 접근 필요)
build:
	@if [ -z "$(filter-out $@,$(MAKECMDGOALS))" ]; then \
		echo "서비스 이름을 입력하세요. 예: make build fe [be|agent]"; \
		exit 1; \
	fi; \
	for svc in $(filter-out $@,$(MAKECMDGOALS)); do \
		if [ "$$svc" = "be" ]; then \
			docker build -f ./be/Dockerfile . -t h-console-$$svc:latest; \ 
		else \
			docker build -f ./$$svc/Dockerfile ./$$svc -t h-console-$$svc:latest; \
		fi; \
	done

clean:
	docker container prune -f
	docker image prune -f

# make build fe be agent 형태로 사용하기 위한 Makefile 트릭
%:
	@:
