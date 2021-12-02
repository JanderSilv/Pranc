import http.client
import concurrent.futures
from time import time
from random import randint

#numero de threads
NUM_PROCS = 32

#numero de requisicoes por thread
NUM_REQ = 1000

HOST = '25.88.166.117'
PORT = 80

urls = [
  '/sobre',
  '/_next/static/css/6bbc981c9ec5281df4a0.css',
  '/_next/static/chunks/webpack-727a25d484a11b3dd99c.js',
  '/_next/static/chunks/framework-2191d16384373197bc0a.js',
  '/_next/static/chunks/main-c4f2541b93e4ae8b71f8.js',
  '/_next/static/chunks/pages/_app-650e3298587f9a193a9f.js',
  '/_next/static/chunks/447-1c6c33ff811bce3a22f8.js',
  '/_next/static/chunks/799-17c021fe922edef86050.js',
  '/_next/static/chunks/768-9f1a5795a3db9b3f3ab0.js',
  '/_next/static/chunks/pages/sobre-d55f39b3ab6023069fe3.js',
  '/_next/static/qrncO0EEl9uNwx4lumjsd/_buildManifest.js',
  '/_next/static/qrncO0EEl9uNwx4lumjsd/_ssgManifest.js',
  '/assets/images/team/jander.png',
  '/assets/images/team/aragao.png',
  '/assets/images/team/maira.png',
  '/assets/images/team/ruan.png',
  '/assets/images/team/yasmin.png',
  '/_next/static/chunks/529.6971413ff88379093e58.js',
  '/_next/static/media/GOOD_TIMING_BD.c8b67d96b5f0670f8d137fdbc1ddbb95.TTF',   
  '/_next/image?url=%2Fassets%2Fimages%2Fabout%2FcimatecLogo.png&w=750&q=90',  
  '/_next/image?url=%2Fassets%2Fimages%2Ftechs%2Fnextjs.png&w=256&q=90',       
  '/_next/image?url=%2Fassets%2Fimages%2Ftechs%2Ftypescript.png&w=256&q=90',   
  '/_next/image?url=%2Fassets%2Fimages%2Ftechs%2Fpython.png&w=256&q=90',       
  '/_next/image?url=%2Fassets%2Fimages%2Ftechs%2Fdocker.png&w=256&q=90',       
  '/_next/image?url=%2Fassets%2Fimages%2Ftechs%2Fnginx.png&w=256&q=90',        
  '/_next/image?url=%2Fassets%2Fimages%2Ftechs%2Fadobexd.png&w=256&q=90',      
  '/_next/static/chunks/291.4bda4bf398eb32c77b1b.js',
  '/_next/static/media/GOOD_TIMING_BD.c8b67d96b5f0670f8d137fdbc1ddbb95.TTF',   
  '/assets/favicon/android-icon-192x192.png',
  '/assets/favicon/favicon-32x32.png'
    ]

def make_request(id):
    print(f'Process {id} started')
    succ = 0
    try:
        t1 = time()
        
        for _ in range(NUM_REQ):
            for u in urls:
                conn = http.client.HTTPConnection(HOST,PORT)
                conn.request('GET',u)
                status = conn.getresponse().status
                if status >= 400:
                    print(f'Process {id}\nResponse not 200: {status}, Num Sucess: {succ}')
                    break
                else:
                    succ +=1
        t2 = time()
        return (id,(t2-t1))
    except Exception as e:
        print(f'Error in process {id} | Num Sucess: {succ} | {e}')
        

with concurrent.futures.ThreadPoolExecutor() as executor:
    procs = [executor.submit(make_request,i) for i in range(NUM_PROCS)]

    for p in concurrent.futures.as_completed(procs):
        id,t = p.result()
        print(f'{id}>> Tempo Medio/Total: {t/NUM_REQ}/{t}')
        print('Parabains')
