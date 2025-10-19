
LOCAL_TASKS := local-run proto-gen
DOCKER_TASKS := docker-build docker-run docker-clean
K8S_TASKS := k8s-deploy
COMMON_TASKS := run build clean proto

.PHONY: $(BUILD_TASKS) $(DOCKER_TASKS) $(K8S_TASKS) $(COMMON_TASKS)

run: local-run
build: docker-build
clean: docker-clean
proto: proto-gen

local-run:
	uv run python3 src/agent/main.py

docker-build:
	docker build -t h-console-agent:latest .

docke-run:
	docker run h-console-agent:latest

docker-clean:
	docker container prune -f
	docker image prune -f

k8s-deploy:
	kubectl apply -f k8s/deploy/agent.yaml

proto-gen:
	@echo "Cleaning old generated proto files..."
	rm -f src/agent/*_pb2.py src/agent/*_pb2_grpc.py
	@echo "Generating gRPC Python stubs..."
	uv run python -m grpc_tools.protoc \
		-I=../protos \
		--python_out=src/agent \
		--grpc_python_out=src/agent \
		../protos/*.proto
	@echo "Proto generation complete."