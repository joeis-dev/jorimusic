from flask import Flask, request, jsonify
import yt_dlp
import os

app = Flask(__name__)

@app.route('/health')
def health_check():
    return jsonify({'status': 'UP'}), 200

@app.route('/readiness')
def health_check():
    return jsonify({'status': 'UP'}), 200

@app.route('/download', methods=['POST'])
def download_song():
    data = request.get_json()
    song_name = data.get('song_name')

    if not song_name:
        return jsonify({'error': 'Song name is required'}), 400

    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': f'music/%(title)s.%(ext)s',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            info = ydl.extract_info(f"ytsearch:{song_name}", download=True)['entries'][0]
            return jsonify({'message': f'Successfully downloaded {info["title"]}'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    if not os.path.exists('music'):
        os.makedirs('music')
    app.run(host='0.0.0.0', port=5000)
