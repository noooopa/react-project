# Dockerfile
FROM postgres:14

# 기본값(원하면 build 시 박제되지만, 보안상 run 시 -e로 덮어쓰는 것을 권장)
ENV POSTGRES_DB=mydb
ENV POSTGRES_USER=myo
ENV POSTGRES_PASSWORD=1234
ENV TZ=Asia/Seoul

EXPOSE 5432
#엔트리포인트/커맨드는 postgres 공식 이미지 기본값 사용
