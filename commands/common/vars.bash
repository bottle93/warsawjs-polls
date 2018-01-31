#!/bin/bash -e

export NGINX_BASE_IMAGE=nginx_base
export FRONTEND_BUILD_IMAGE=${FRONTEND_BUILD_IMAGE:-frontend-temp}
export FRONTEND_IMAGE=${FRONTEND_IMAGE:-warsawjs-polls-frontend}
export BACKEND_IMAGE=${BACKEND_IMAGE:-warsawjs-polls-backend}
export DOMAIN=${DOMAIN:-_}