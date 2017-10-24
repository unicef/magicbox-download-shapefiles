mkdir -p data
mkdir -p data/shapefiles
mkdir -p data/zipfiles

check_file() {
  local dir="$1"
  if [ -d "$dir" ]; then
      echo "yay: $dir found"
  else
      echo "Missing required $dir"
  fi
}
check_file 'data/shapefiles'
check_file 'data/zipfiles'
