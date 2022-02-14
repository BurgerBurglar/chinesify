from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pinyin import beautify_ming, beautify_xing
from translate import translate

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/mings/{name}")
def get_ming(
    name: str,
    gender: str,
    is_transliteration: bool = True,
):
    try:
        translation = translate(name, is_transliteration)
        ming = translation["chinese_name"]
        source_language = translation["source_language"]

        ming_chars_options = beautify_ming(ming, gender)

        return {
            "translation": ming,
            "source_language": source_language,
            "options": ming_chars_options,
        }
    except ValueError as e:
        detail = str(e)
        raise HTTPException(status_code=400, detail=detail)


@app.get("/xings/{name}")
def get_xing(
    name: str,
    is_transliteration: bool = True,
):
    try:
        translation = translate(name, is_transliteration)
        xing = translation["chinese_name"]

        xing_options = beautify_xing(xing)

        return {
            "translation": xing,
            "options": xing_options,
        }
    except ValueError as e:
        detail = str(e)
        raise HTTPException(status_code=400, detail=detail)
