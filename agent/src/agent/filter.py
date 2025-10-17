def filter_data(data, level="INFO"):
    # 예: 특정 metric 값 기준 필터링
    if data.get("cpu", 0) > 80:
        data["level"] = "WARN"
    else:
        data["level"] = "INFO"
    return data

